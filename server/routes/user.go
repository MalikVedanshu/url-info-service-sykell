package routes


import (
	"os"
	"time"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/db"
	"server/models"
	"golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"
	// "fmt"
	"server/middlewares"
	// "github.com/joho/godotenv"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

// Login input struct
type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type JwtClaims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}



func AuthRoutes(router *gin.Engine) {
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/signup", signupHandler)
		authGroup.GET("/user/:id", middlewares.LoginMiddleware(), getUserById)
		authGroup.POST("/login", loginHandler)
		
	}
}

func signupHandler(c *gin.Context) {
	// c.JSON(http.StatusOK, gin.H {"message": "Register response"})

	var user models.User

	// Bind incoming JSON to user model
	bindErr := c.ShouldBindJSON(&user)
	if bindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }
    user.Password = string(hashedPassword)

	// Create user in DB
	createdUserResult := db.DB.Create(&user)
	if createdUserResult.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully", "user": user})
}


func getUserById (c *gin.Context) {
	id := c.Param("id")
	var user models.User

	result := db.DB.First(&user, "id = ?", id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func loginHandler(c *gin.Context) {
	// c.JSON(http.StatusOK, gin.H{"message": "Login response"})
	

	var input LoginInput

	// validate and bind with LoginInput struct
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email or password"})
		return
	}

	// Finding user by email
	var user models.User
	if err := db.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Compare hashed password with user input
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Create JWT token and sending as response
	claims := JwtClaims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)), // Token valid for 24h
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "url-info-service-sykell",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Return token
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}



package middlewares

import (
	"fmt"
	"os"
	"github.com/gin-gonic/gin"
	// "http"
	// "golang.org/x/crypto/bcrypt"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	// "github.com/joho/godotenv"

)

type JwtClaims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))


func LoginMiddleware () gin.HandlerFunc {
	
	return func (c *gin.Context) {

		headerToken := c.GetHeader("z-token")
		
		if headerToken == "" {
			
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token"})
			return
		}

		token, err := jwt.ParseWithClaims(headerToken, &JwtClaims{}, func(token *jwt.Token) (interface{}, error) {

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			// fmt.Println("JWT Parse error:", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			return
		}


		if claims, ok := token.Claims.(*JwtClaims); ok {
			
			// fmt.Println("Authorized, forwarding")

			c.Set("userID", claims.UserID)
			c.Next()
		} else {
			// fmt.Println("Unauthorized aborting");
			
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			return
		}

		// fmt.Println("Middleware start")
		
		// c.Next()

		// fmt.Println("Middleware ended")
	}
}

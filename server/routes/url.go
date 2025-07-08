package routes

import (
	"github.com/gin-gonic/gin"
	"server/middlewares"
	"server/db"
	"net/http"
	"server/models"
)

type CreateUrl struct {
	Url string `json:"url", binding:"required"`
}

func UrlRoutes (router *gin.Engine) {
	urlGroup := router.Group("/url")
	{
		urlGroup.GET("/get", middlewares.LoginMiddleware(), getUrl)
		urlGroup.POST("/add", middlewares.LoginMiddleware(), addUrl)
		urlGroup.POST("/analyse", middlewares.LoginMiddleware(), analyseUrl)
		urlGroup.GET("/get/:urlId", middlewares.LoginMiddleware(), getUrlDataById)
	}
}


func getUrl (c *gin.Context) {
	var urls models.AllUrl
	userIDVal, exists := c.Get("userID")

	if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
        return
    }

	result := db.DB.Where("user_id = ? ", userIDVal).Limit(10).Find(&urls)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No url's found"})
		return
	}

	c.JSON(200, gin.H{"message": urls})
	return
}

func addUrl (c *gin.Context) {
	var urls models.AllUrl

	bindErr := c.ShouldBindJSON(&urls)
	if bindErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":"Invalid JSON"})
		return
	}

	userIdVal, exists := c.Get("userID")

	if !exists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User"})
		return
	}

	userIdStr, ok := userIdVal.(string)

	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Token"})
		return
	}

	urls.UserId = userIdStr

	addUrlResult := db.DB.Create(&urls)

	if addUrlResult.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error":"Couldn't add URL. Something went wrong"})
		return
	}

	c.JSON(200, gin.H{ "message": "URL Added successfully" })

}

func getUrlDataById (c *gin.Context) {

	urlId := c.Param("urlId")

	var allTheUrls models.AllUrl

	result := db.DB.First(&allTheUrls, "id = ?", urlId)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Requested Url is not correct"})
		return
	}


	c.JSON(200, gin.H{"data": result})
}

func analyseUrl (c *gin.Context) {
	// var urls models.AllUrl
	c.JSON(200, gin.H{"message": "Analyse route"})
}


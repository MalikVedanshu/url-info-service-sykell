package routes

import (
	"github.com/gin-gonic/gin"
	"server/middlewares"
	// "server/models"
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
	}
}


func getUrl (c *gin.Context) {
	// var urls models.AllUrl

	c.JSON(200, gin.H{"message": "Get route"})
	return
}

func addUrl (c *gin.Context) {
	// var urls models.AllUrl

	c.JSON(200, gin.H{ "message": "Add route" })

}

func analyseUrl (c *gin.Context) {
	// var urls models.AllUrl
	c.JSON(200, gin.H{"message": "Analyse route"})
}


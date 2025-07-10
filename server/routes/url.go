package routes

import (
	"github.com/gin-gonic/gin"
	"server/middlewares"
	"server/db"
	"net/http"
	"server/models"
	// "github.com/PuerkitoBio/goquery"
	// "io/ioutil"
	"server/utils"
	// "fmt"
)

type CreateUrl struct {
	Url string `json:"url", binding:"required"`
}

func UrlRoutes (router *gin.Engine) {
	urlGroup := router.Group("/url")
	{
		urlGroup.GET("/get", middlewares.LoginMiddleware(), getUrl)
		urlGroup.POST("/add", middlewares.LoginMiddleware(), addUrl)
		urlGroup.PUT("/analyse/:urlid", middlewares.LoginMiddleware(), analyseUrl)
		urlGroup.GET("/get/:urlId", middlewares.LoginMiddleware(), getUrlDataById)
	}
}


func getUrl (c *gin.Context) {
	var urls[] models.AllUrl
	userIDVal, exists := c.Get("userID")

	if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
        return
    }

	result := db.DB.Where("user_id = ? ", userIDVal).Limit(10).Find(&urls)
	// fmt.Println("urls", urls)

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

	duplicateUrl := db.DB.Where("user_id = ? AND url = ?", userIdStr, urls.Url).First(&urls)

	if duplicateUrl.Error == nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": "This URL already exists for this user"})
		return
	}

	// if result.Error != nil {
    //     if errors.Is(result.Error, gorm.ErrRecordNotFound) {
    //         return false, nil
    //     }
    //     return false, result.Error // Other DB errors
    // }


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
	
	urlid := c.Param("urlid");

	var allUrl models.AllUrl

	urlResult := db.DB.First(&allUrl, "id = ?", urlid)

	if urlResult.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	result, err := utils.AnalyzeURL(allUrl.Url)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	allUrl.Title = result.Title
	allUrl.HtmlVersion = result.HTMLVersion
	allUrl.H1 = result.HCount["h1"]
	allUrl.H2 = result.HCount["h2"]
	allUrl.H3 = result.HCount["h3"]
	allUrl.H4 = result.HCount["h4"]
	allUrl.H5 = result.HCount["h5"]
	allUrl.H6 = result.HCount["h6"]
	allUrl.InternalLinks = result.InternalLinks
	allUrl.ExternalLinks = result.ExternalLinks
	allUrl.InAccessibleLinks = result.InAccessibleLinks
	allUrl.PresenseOfLoginForm = result.HasLoginForm
	allUrl.Analysed = true

	if err := db.DB.Save(&allUrl).Error; err != nil {
		c.JSON(500, gin.H{"error": "Error analyzing the url, cannot save in info in db"})
		return
	}

	c.JSON(200, gin.H{"message": "Analysis successful", allUrl});

}


package middlewares

import (
	"fmt"
	"github.com/gin-gonic/gin"
)


func LoginMiddleware () gin.HandlerFunc {
	return func (c *gin.Context) {
		fmt.Println("Middleware start")
		
		c.Next()

		fmt.Println("Middleware ends")
	}
}

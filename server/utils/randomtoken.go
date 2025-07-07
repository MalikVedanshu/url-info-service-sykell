package utils

import (

	"math/rand"
	"time"
)

func CreateRandomAlpha () string {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
	rand.Seed(time.Now().UnixNano())
	lengthNeeded := 8
	result := make([]byte, lengthNeeded)
	
	for i := range result {
		result[i] = chars[rand.Intn(len(chars))]
	}

	return string(result)
}
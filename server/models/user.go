package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	// "math/rand"
	// "time"
)

type User struct {
	gorm.Model
	ID 		 string `json:id gorm:"primaryKey"`
	Name	 string `json:"name"`
	Email	 string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	Token	 string `json:"token"` 
	Verified bool `json:"verified"` // we can have this value false by default and can change it to 2 after user click email verification 
}


// Hook: Create UUID for new user

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()

	// randomTkn := createRandomAlpha()

	// u.Token = randomTkn
	return
}

// func createRandomAlpha () string {
// 	const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
// 	rand.Seed(time.Now().UnixNano())
// 	lengthNeeded := 8
// 	result := make([]byte, lengthNeeded)
	
// 	for i := range result {
// 		result[i] = chars[rand.Intn(len(chars))]
// 	}

// 	return string(result)
// }


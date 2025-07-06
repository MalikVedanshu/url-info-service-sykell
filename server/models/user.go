package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID 		 string `json:id gorm:"primarykey"`
	Name	 string `json:"name"`
	Email	 string `json:"email" gorm:"unique"`
	Password string `json:"password"`
	Token	 string `json:"token"` 
}

// Hook: Create UUID for new user

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
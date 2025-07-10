package models

import (
	"gorm.io/gorm"
	"github.com/google/uuid"
)

type AllUrl struct {
	gorm.Model
	UserId string `json:"userId"`
	Title string `json:"title"`
	Url string `json:"url"`
	ID string `json:"id" gorm: "primaryKey"`
	HtmlVersion string `json:"htmlVersion"`
	H1 int `json:"h1"`
	H2 int `json:"h2"`
	H3 int `json:"h3"`
	H4 int `json:"h4"`
	H5 int `json:"h5"`
	H6 int `json:"h6"`
	InternalLinks int `json:"internalLinks"`
	ExternalLinks int `json:"externalLinks"`
	InAccessibleLinks int `json:"inAccessibleLinks"`
	PresenseOfLoginForm bool `json:"presenseOfLoginForm"`
	Analysed bool `json:"analysed"`
}

func (ur *AllUrl) BeforeCreate(tx *gorm.DB) (err error) {
	ur.ID = uuid.New().String()
	return
}


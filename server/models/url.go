package models

import (
	"gorm.io/gorm"
)

type AllUrl struct {
	gorm.Model
	Title string `json:"title"`
	Url string `json:"url" gorm:"unique"`
	ID string `json:"id"`
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
}


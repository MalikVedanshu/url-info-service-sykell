package utils

import (
	"net/http"
	"strings"
	"strconv"
	"net/url"
	// "io/ioutil"
	"io"
	// "fmt"
	
	"github.com/PuerkitoBio/goquery"
)

type AnalysisResult struct {
	Title              string
	HTMLVersion        string
	HCount             map[string]int
	HasLoginForm       bool
	InternalLinks      int
	ExternalLinks      int
	InAccessibleLinks  int
}

// Detect HTML Version from DOCTYPE
func GetHTMLVersion(html string) string {
	lowerHTML := strings.ToLower(html)

	if strings.Contains(lowerHTML, "<!doctype html>") {
		return "HTML5"
	}
	if strings.Contains(lowerHTML, "xhtml") {
		return "XHTML"
	}
	if strings.Contains(lowerHTML, "html 4.01") {
		return "HTML 4.01"
	}
	if strings.Contains(lowerHTML, "html 3.2") {
		return "HTML 3.2"
	}
	return "Unknown"
}

func AnalyzeURL(rawurl string) (*AnalysisResult, error) {
	resp, err := http.Get(rawurl)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Read full body
	bodyBytes, err := io.ReadAll(resp.Body)

	// fmt.Println("resp.Body", resp.Body)
	if err != nil {
		return nil, err
	}
	htmlString := string(bodyBytes)

	// fmt.Println("htmlString : ", htmlString);

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(htmlString))
	if err != nil {
		return nil, err
	}

	// Count headings
	hCount := make(map[string]int)
	for i := 1; i <= 6; i++ {
		tag := "h" + strconv.Itoa(i)
		hCount[tag] = doc.Find(tag).Length()
	}

	title := doc.Find("title").First().Text()
	htmlVersion := GetHTMLVersion(htmlString)

	// Check for login form (presence of input[type=password] inside a form)
	hasLoginForm := false
	doc.Find("form").EachWithBreak(func(i int, s *goquery.Selection) bool {
		if s.Find("input[type='password']").Length() > 0 {
			hasLoginForm = true
			return false // stop iterating
		}
		return true
	})

	// Parse base URL for link classification
	parsedBaseURL, err := url.Parse(rawurl)
	if err != nil {
		return nil, err
	}

	internalLinks := 0
	externalLinks := 0
	inaccessibleLinks := 0

	doc.Find("a[href]").Each(func(i int, s *goquery.Selection) {
		href, exists := s.Attr("href")
		if !exists || href == "" {
			return
		}
		parsedHref, err := url.Parse(href)
		if err != nil {
			inaccessibleLinks++
			return
		}
		
		absUrl := parsedBaseURL.ResolveReference(parsedHref)

		if absUrl.Host == parsedBaseURL.Host {
			internalLinks++
		} else {
			externalLinks++
		}

	})

	return &AnalysisResult{
		Title:             title,
		HTMLVersion:       htmlVersion,
		HCount:            hCount,
		HasLoginForm:      hasLoginForm,
		InternalLinks:     internalLinks,
		ExternalLinks:     externalLinks,
		InAccessibleLinks: inaccessibleLinks,
	}, nil
}


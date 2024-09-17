package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Book struct {
	BookId      int    `json:"id"`
	BookIndex   int    `json:"index"`
	Title       string `json:"title"`
	Author      string `json:"author"`
	IsAvailable bool   `json:"isAvailable"`
}

func main() {
	fmt.Println("Hello Working air also")
	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error in loading .env file")
	}

	PORT := os.Getenv("PORT")
	books := []Book{}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"message": "basic get working"})
	})

	app.Get("/book", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(books)
	})

	app.Post("/book", func(c *fiber.Ctx) error {
		book := &Book{}

		if err := c.BodyParser(book); err != nil {
			return err
		}

		if book.Title == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Book Title is required"})
		}

		if book.Author == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Book Author is required"})
		}

		book.BookIndex = len(books) + 1
		book.BookId = len(books)*5 + 2
		book.IsAvailable = true
		books = append(books, *book)

		return c.Status(201).JSON(book)

	})

	app.Patch("/book/:id", func(c *fiber.Ctx) error {
		bid := c.Params("id")
		for i, book := range books {
			if fmt.Sprint(book.BookId) == bid {
				books[i].IsAvailable = false
				return c.Status(200).JSON(books[i])
			}
		}
		return c.Status(400).JSON(fiber.Map{"error": "Book not found"})
	})

	app.Delete("/book/:id", func(c *fiber.Ctx) error {
		bid := c.Params("id")
		for i, book := range books {
			if fmt.Sprint(book.BookId) == bid {
				books = append(books[:i], books[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"success": true})
			}
		}
		return c.Status(400).JSON(fiber.Map{"error": "Book not found"})
	})
	log.Fatal(app.Listen(":" + PORT))

}

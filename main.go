package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Book struct {
	BookId   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title    string             `json:"title"`
	Author   string             `json:"author"`
	Quantity int                `json:"quantity"`
}

var collection *mongo.Collection

func main() {
	fmt.Println("hello working")

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error in loading .env file :")
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("Error in mongodb connection :", err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error in mongodb ping :", err)
	}

	fmt.Println("Connected to MONGODB")

	collection = client.Database("books-database").Collection("books")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173/",
	}))

	app.Get("/api/book", getBooks)
	app.Post("/api/book", createBook)
	app.Patch("/api/book/:id", updateBook)
	app.Delete("/api/book/:id", deleteBook)

	PORT := os.Getenv("PORT")
	log.Fatal(app.Listen("0.0.0.0:" + PORT))

}

func getBooks(c *fiber.Ctx) error {
	var books []Book

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var book Book
		if err := cursor.Decode(&book); err != nil {
			return err
		}
		books = append(books, book)
	}

	return c.JSON(books)
}

func createBook(c *fiber.Ctx) error {
	book := new(Book)

	if err := c.BodyParser(book); err != nil {
		return err
	}

	if book.Author == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Author is required"})
	}

	if book.Title == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Title is required"})
	}

	if book.Quantity <= 0 {
		return c.Status(400).JSON(fiber.Map{"error": "Quantity must be greater than or equal to 0"})
	}

	data, err := collection.InsertOne(context.Background(), book)
	if err != nil {
		return err
	}
	book.BookId = data.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(book)
}

func updateBook(c *fiber.Ctx) error {
	id := c.Params("id")
	bookId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	var quantitydata struct {
		Quantity int `json:"quantity"`
	}

	if err := c.BodyParser(&quantitydata); err != nil {
		return err
	}

	if quantitydata.Quantity < 0 {
		return c.Status(400).JSON(fiber.Map{"error": "Quantity must be greater than or equal to 0"})
	}

	filter := bson.M{"_id": bookId}
	update := bson.M{"$set": bson.M{"quantity": quantitydata.Quantity}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": "Quantity updated successfully"})
}

func deleteBook(c *fiber.Ctx) error {
	id := c.Params("id")
	bookId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Book Id"})
	}

	filter := bson.M{"_id": bookId}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": "Book deleted successfully"})

}

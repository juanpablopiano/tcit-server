const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES//
// CREATE A POST
app.post("/posts", async (req, res) => {
	try {
		const { name, description } = req.body;
		const newPost = await pool.query(
			"INSERT INTO post (name, description) VALUES ($1, $2) RETURNING *",
			[name, description]
		);

		res.json(newPost.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

// GET ALL POSTS
app.get("/posts", async (req, res) => {
	try {
		const allPosts = await pool.query("SELECT * FROM post");

		res.json(allPosts.rows);
	} catch (error) {
		console.log(error.message);
	}
});

// GET A POST
app.get("/posts/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const post = await pool.query("SELECT * FROM post WHERE post_id = $1", [
			id,
		]);

		res.json(post.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

// UPDATE A POST
app.put("/posts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;

		const updatedPost = await pool.query(
			"UPDATE post SET name = $1, description = $2 WHERE post_id = $3 RETURNING *",
			[name, description, id]
		);
		res.json(updatedPost.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

// DELETE A POST
app.delete("/posts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedPost = await pool.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [id]);

		res.json(deletedPost.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
})


const port = process.env.PORT;
app.listen(port, () => console.log(`The app is listening on port ${port}`));

const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find(); // find() est une méthode de mongoose qui permet de récupérer tous les documents d'une collection
  res.status(200).json(posts); // status(200) est une méthode de express qui permet de définir le code de retour de la requête
};

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Le message est obligatoire" });
  }
  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });

  res.status(200).json(post);
};

module.exports.editPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "Le post n'existe pas" });
  }

  const updatedPost = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

module.exports.deletePost = async (req, res) => {
  try {
    const result = await PostModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Le post n'existe pas" });
    }
    res.status(200).json({ message: "Le post a été supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la suppression du post",
      });
  }
};

module.exports.likePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data))
    } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data))
    } catch (error) {
    res.status(400).json(error);
  }
};
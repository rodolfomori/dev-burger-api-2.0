import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
  async store(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      try {
        schema.validateSync(request.body, { abortEarly: false });
      } catch (err) {
        return response.status(400).json({ error: err.errors });
      }

      const { admin: isAdmin } = await User.findByPk(request.userId);

      if (!isAdmin) {
        return response.status(401).json();
      }

      const { name } = request.body;

      const { filename: path } = request.file;

      const categoryExists = await Category.findOne({
        where: {
          name,
        },
      });

      if (categoryExists) {
        return response.status(400).json({ error: 'Category already exists' });
      }

      const { id } = await Category.create({ name, path });

      return response.json({ id, name });
    } catch (err) {
      console.log(err);
    }
  }

  async index(request, response) {
    const category = await Category.findAll();

    return response.json(category);
  }

  async update(request, response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
      });

      try {
        schema.validateSync(request.body, { abortEarly: false });
      } catch (err) {
        return response.status(400).json({ error: err.errors });
      }

      const { admin: isAdmin } = await User.findByPk(request.userId);

      if (!isAdmin) {
        return response.status(401).json();
      }

      const { name } = request.body;

      const { id } = request.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return response
          .status(401)
          .json({ error: 'Make sure your category id is correct' });
      }

      let path;
      if (request.file) {
        path = request.file.filename;
      }

      await Category.update({ name, path }, { where: { id } });

      return response.status(200).json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CategoryController();

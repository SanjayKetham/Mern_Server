const User = require('./model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
};

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await User.find();
      } catch (err) {
        console.error('Error fetching users:', err);
        throw new Error('Failed to fetch users');
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      try {
        if (!name || !email || !password) {
          throw new Error('Please provide all required fields (name, email, password)');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        return savedUser;
      } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Failed to create user');
      }
    },
    changePass: async (_, { id, password }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        const updatedUser = await user.save();
        console.log('User password updated successfully');
        return updatedUser;
      } catch (err) {
        console.error('Error changing password:', err);
        throw new Error('Failed to change password');
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Invalid credentials');
        }

        const token = generateToken(user); 
        return {
          token,
          user,
        };
      } catch (err) {
        console.error('Error logging in user:', err);
        throw new Error('Please Register');
      }
    },
  },
};

module.exports = resolvers;

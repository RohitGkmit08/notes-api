const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login };
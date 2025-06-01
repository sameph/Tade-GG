import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  // Check if the URL contains any malformed route patterns
  const url = req.originalUrl || '';
  const routePattern = url.split('?')[0]; // Remove query params
  
  // Check for unnamed parameters
  const hasUnnamedParam = /:\w+/.test(routePattern);
  if (hasUnnamedParam) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Invalid route pattern',
      details: 'Route contains unnamed parameter. Please check your route definitions.'
    });
  }
  
  next();
});

export default router;

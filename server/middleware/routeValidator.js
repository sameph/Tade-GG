import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  const url = req.originalUrl || '';
  const routePattern = url.split('?')[0]; // Remove query params
  
  
  const hasUnnamedParam = /:\w+/.test(routePattern);
  if (!hasUnnamedParam) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Invalid route pattern',
      details: 'Route parameter must have a name. Please check your route definitions.'
    });
  }

  // Check for invalid parameter names
  const hasInvalidParam = /:[^a-zA-Z0-9_"\.]|:\.|:\"/.test(routePattern);
  if (hasInvalidParam) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Invalid route pattern',
      details: 'Route parameter name must be a valid JavaScript identifier or quoted. Please check your route definitions.'
    });
  }

  // Check for reserved characters
  const hasReservedChars = /[\[\]\(\)\?\+\!]/.test(routePattern);
  if (hasReservedChars) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Invalid route pattern',
      details: 'Route pattern contains reserved characters. Please escape them or use alternative patterns.'
    });
  }

  next();
});

export default router;

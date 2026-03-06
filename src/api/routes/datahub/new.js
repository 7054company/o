import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { query } from '../../config/database.js';
import { authenticateToken } from '../../auth.js';

const router = express.Router();

// Create new data entry
router.post('/new', authenticateToken, async (req, res) => {
  try {
    const { data = {}, bucket_id = null, tags = [] } = req.body;
    const id = uuidv4();
    const apiKey = crypto.randomBytes(32).toString('hex');
    
    const config = {
      apiKey,
      api: {
        enabled: false,
        cors: true,
        rateLimit: {
          enabled: true,
          requests: 100,
          period: '1m'
        }
      },
      security: {
        requireAuth: true
      }
    };

    // Normalize tags
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    const sql = `
      INSERT INTO datahub_data (
        id, user_id, bucket_id, data, config, tags, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    await query(sql, [
      id, 
      req.user.id,
      bucket_id,
      JSON.stringify(data),
      JSON.stringify(config),
      JSON.stringify(normalizedTags)
    ]);
    
    res.status(201).json({
      success: true,
      data: {
        id,
        apiKey,
        bucket_id,
        tags: normalizedTags,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create data entry',
      error: error.message 
    });
  }
});

// Get data entry by ID
router.get('/x/:id', authenticateToken, async (req, res) => {
  try {
    const sql = `
      SELECT 
        id,
        user_id,
        bucket_id,
        data,
        config,
        tags,
        logs,
        created_at,
        updated_at
      FROM datahub_data
      WHERE id = ? AND user_id = ?
    `;
    
    const [result] = await query(sql, [req.params.id, req.user.id]);
    
    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: 'Data not found' 
      });
    }
    
    // Parse config and tags
    const config = JSON.parse(result.config || '{}');
    const tags = JSON.parse(result.tags || '[]');
    
    res.json({
      success: true,
      data: {
        ...result,
        config,
        tags,
        data: JSON.parse(result.data || '{}')
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch data entry',
      error: error.message 
    });
  }
});

// Update data entry
router.put('/x/:id', authenticateToken, async (req, res) => {
  try {
    const { data, config, tags, bucket_id } = req.body;
    const updateFields = [];
    const values = [];

    if (data !== undefined) {
      updateFields.push('data = ?');
      values.push(JSON.stringify(data));
    }

    if (config !== undefined) {
      updateFields.push('config = ?');
      values.push(JSON.stringify(config));
    }

    if (tags !== undefined) {
      updateFields.push('tags = ?');
      values.push(JSON.stringify(Array.isArray(tags) ? tags : [tags]));
    }

    if (bucket_id !== undefined) {
      updateFields.push('bucket_id = ?');
      values.push(bucket_id);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    updateFields.push('updated_at = NOW()');
    values.push(req.params.id, req.user.id);

    const sql = `
      UPDATE datahub_data 
      SET ${updateFields.join(', ')}
      WHERE id = ? AND user_id = ?
    `;

    const result = await query(sql, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data entry not found or unauthorized'
      });
    }
    
    const updatedData = await query(
      'SELECT * FROM datahub_data WHERE id = ? AND user_id = ?', 
      [req.params.id, req.user.id]
    );
    
    res.json({
      success: true,
      data: {
        ...updatedData[0],
        config: JSON.parse(updatedData[0].config || '{}'),
        tags: JSON.parse(updatedData[0].tags || '[]'),
        data: JSON.parse(updatedData[0].data || '{}')
      }
    });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update data entry',
      error: error.message
    });
  }
});

// Delete data entry
router.delete('/x/:id', authenticateToken, async (req, res) => {
  try {
    const sql = 'DELETE FROM datahub_data WHERE id = ? AND user_id = ?';
    const result = await query(sql, [req.params.id, req.user.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data entry not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Data entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete data entry',
      error: error.message
    });
  }
});

export default router;
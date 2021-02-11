const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM listado', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
  
});

// GET An listado
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM listado WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An listado
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM listado WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'listado Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An listado\
/**
 * SET @id = ?;
      SET @nombre = ?;
      SET @cedula = ?;
      SET @placa = ?;
      SET @estado = ?;
 */
router.post('/', (req, res) => {
  const {id,nombre,cedula,placa,estado} = req.body;
  console.log(id, nombre, cedula,placa,estado);
  const query = `
      
    CALL listadoAddOrEdit(?,?,?,?,?);
  `;
  mysqlConnection.query(query, [id,nombre,cedula,placa,estado], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'listadod Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const {nombre,cedula,placa,estado} = req.body;
  const { id } = req.params;
  const query = `
     
    CALL listadoAddOrEdit(?,?,?,?,?);
  `;
  mysqlConnection.query(query, [id, nombre,cedula,placa,estado], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'listado Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
  

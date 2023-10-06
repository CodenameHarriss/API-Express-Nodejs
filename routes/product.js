const express = require('express');
const connection = require('../connection');
const router = express.Router();


router.post('/create', (req, res) => {
    let prd = req.body;
    query = "INSERT INTO product (prd_name,prd_price,prd_qty) VALUES (?,?,?)";
    connection.query(query, [prd.prd_name, prd.prd_price, prd.prd_qty], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "เพิ่มข้อมูล product สำเร็จ" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/read', (req, res) => {
    query = "SELECT * FROM product";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/read/:id', (req, res) => {
    const id = req.params.id;
    query = "SELECT * FROM product WHERE prd_id = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลที่ค้นหา" });
            }
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    let prd = req.body;
    query = "UPDATE product SET prd_name = ?, prd_price = ?, prd_qty = ? WHERE prd_id = ?";
    connection.query(query, [prd.prd_name, prd.prd_price, prd.prd_qty, id], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "ไม่พบ id" });
            }
            return res.status(200).json({ message: "แก้ไขข้อมูล product สำเร็จ" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    query = "DELETE FROM product WHERE prd_id = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "ไม่พบ id" });
            }
            return res.status(200).json({ message: "ลบข้อมูล product สำเร็จ" });
        } else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;
const express = require('express');
const connection = require('../connection');
const router = express.Router();


router.post('/create', (req, res) => {
    let user = req.body;
    query = "INSERT INTO users (fullname,phone,address,email,password) VALUES (?,?,?,?,?)";
    connection.query(query, [user.fullname, user.phone, user.address, user.email, user.password], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "เพิ่มข้อมูล user สำเร็จ" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/read', (req, res) => {
    query = "SELECT * FROM users";
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
    query = "SELECT * FROM users WHERE id = ?";
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
    let user = req.body;
    query = "UPDATE users SET fullname = ?, phone = ?, address = ?, email = ?, password = ? WHERE id = ?";
    connection.query(query, [user.fullname, user.phone, user.address, user.email, user.password, id], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "ไม่พบ id" });
            }
            return res.status(200).json({ message: "แก้ไขข้อมูล user สำเร็จ" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "ไม่พบ id" });
            }
            return res.status(200).json({ message: "ลบข้อมูล user สำเร็จ" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
const express = require('express');
const connection = require('../connection');
const router = express.Router();


router.get('/read/:id', (req, res) => {
    const id = req.params.id;
    query = `SELECT sale.sale_id,sale.sale_date,sale.remark,sale.total_price,
                CASE
                    WHEN sale.status = 1 THEN 'เรียบร้อย'
                    WHEN sale.status = 2 THEN 'ตกค้าง'
                    END AS status,
                sale.prd_id AS sale_prd_id,sale.id AS sale_user_id,product.prd_name,
                users.fullname,users.phone,users.address
                FROM sale
                LEFT JOIN product ON sale.prd_id = product.prd_id
                LEFT JOIN users ON sale.id = users.id
                WHERE sale_id = ?`;
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.length === 0) {
                return res.status(404).json({ message: "ไม่พบข้อมูลที่ค้นหา" });
            }
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
});


module.exports = router;
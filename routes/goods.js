const express = require("express");
const router = express.Router();
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");

router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 장바구니에 해당 상품이 존재합니다.",
        });
    }

    await Cart.create({ goodsId, quantity });

    res.json({ result: "success" });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length) {
        await Cart.updateOne(
            { goodsId: goodsId },
            { $set: { quantity: quantity } }
        );
    }
    res.status(200).json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;

    const existsCarts = await Cart.find({ goodsId });
    if (existsCarts.length) {
        await Cart.deleteOne({ goodsId });
    }

    res.json({ result: "success" });
});

router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });
    if (goods.length) {
        return res
            .status(400)
            .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdGoods = await Goods.create({
        goodsId,
        name,
        thumbnailUrl,
        category,
        price,
    });

    res.json({ goods: createdGoods });
});

// /routes/goods.js
const goods = [
    {
        goodsId: 4,
        name: "상품 4",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
        category: "drink",
        price: 0.1,
    },
    {
        goodsId: 3,
        name: "상품 3",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
        category: "drink",
        price: 2.2,
    },
    {
        goodsId: 2,
        name: "상품 2",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
        category: "drink",
        price: 0.11,
    },
    {
        goodsId: 1,
        name: "상품 1",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
        category: "drink",
        price: 6.2,
    },
];

router.get("/goods", (req, res) => {
    res.status(200).json({ goods: goods });
});

router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params;

    // let result = null;
    // for (const good of goods) {
    //     if (Number(goodsId) === good.goodsId) {
    //         result = good;
    //     }
    // }

    //47 ~ 52번 코드와 같은 내용의 코드.
    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId);

    res.status(200).json({ detail: result });
});

module.exports = router;

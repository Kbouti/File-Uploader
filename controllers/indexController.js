exports.getIndex = async (req, res) => {
    console.log(`getIndex controller function called`);
    res.render("./views/pages/home");
}
const getAllCards = async (req, res) => {
    try {
        const result = await customerModel.find({ _id: customertId, isDeleted: false })
        if (!result) return res.status(404).send({ status: false, message: `No data found` })

        return res.status(200).send({ status: true, message: "Success", data: result })   

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }
}
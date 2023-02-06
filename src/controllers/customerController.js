const customerModel = require("../models/coutomerSchema")
const { isValidObjectId, isValidRequestBody, isValid, isValidImg, isValidName, isValidPrice, isValidSize, isValidDescrption, isValidTitle } = require("../validator/validator")


const getAllCustomers = async (req, res) => {
    try {
        const result = await customerModel.find({ isDeleted: false })
        if (!result) return res.status(404).send({ status: false, message: `No data found` })

        return res.status(200).send({ status: true, message: "Success", data: result })   

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteCustomer = async (req, res) => {
    try {
        let customert_Id = req.params.id
        if (!isValidObjectId(customert_Id)) return res.status(400).send({ status: false, message: "customertId is not in correct format" })

        let deleteProduct = await customerModel.findOneAndUpdate({ _id: customert_Id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
       
        if (!deleteProduct) return res.status(404).send({ status: false, message: 'product not found :)' })
        return res.status(200).send({ status: true, message: "Customer Data deleted successfull" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }
}



const createCustomer = async (req, res) => {
    try {
        let data = req.body

        if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Please provide data in body" });

        let { firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status } = data
        if (!firstName || !isValid(firstName)) { return res.status(400).send({ status: false, message: "First Name is required" }) }

        if (!isValidName(firstName)) return res.status(400).send({ status: false, message: "Enter valid First Name" });

        if (!lastName || !isValid(lastName)) { return res.status(400).send({ status: false, message: "Last name is required" }) }

        if (!isValidName(lastName)) return res.status(400).send({ status: false, message: "Enter valid Last name" });

        if (!emailID || !isValid(emailID)) { return res.status(400).send({ status: false, message: "Email is required" }) }

        if (await userModel.findOne({ emailID })) { return res.status(400).send({ status: false, message: `User already exist with this ${emailID}.` }) }

        if (!isRightFormatemail(emailID)) { return res.status(400).send({ status: false, message: "Please provide a valid email" }) }

        if (!mobileNumber || !isValid(mobileNumber)) { return res.status(400).send({ status: false, message: "Phone number is required" }) }

        if (!DOB || !isValid(DOB)) { return res.status(400).send({ status: false, message: "DOB is required" }) }

        if (!isRightFormatmobile(mobileNumber)) { return res.status(400).send({ status: false, message: "Please provide a valid Indian phone number" }) }

        if (await userModel.findOne({ mobileNumber: mobileNumber })) { return res.status(400).send({ status: false, message: `User already exist with this ${phone}.` }) }

        if (!isValidSize(data.availableSizes[i])) {
            return res.status(400).send({ status: false, message: "Size should be one of these - 'S', 'XS', 'M', 'X', 'L', 'XXL', 'XL'" });
        }


        let customer = await customerModel.create(data);
        return res.status(201).send({ status: true, message: "Success", data: customer });

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { getAllCustomers, deleteCustomer, createCustomer }
const userContacts = require('../Schema/userContactsenquiry')



exports.createContactEnquiry = async(req,res) =>{
    try {
       const newContact = await userContacts.create(req.body);
       res.status(200).json({message:"contact enquiry created successfully", data : newContact}) 
    } catch (error) {
        res.status(400).json({message:"error in createContactenquiry"})
    }
}


exports.getAllcontactenquiry = async(req,res) =>{

try {
        const gettingallcontactenquiry = await userContacts.find()

        res.status(200).json({message:"reterived successfully all contact enquirys", data : gettingallcontactenquiry})
    } 
    
    catch (error) {
        res.status(400).json({message:"error in getAllcontactenquiry"})
    }

}

exports.getContactById = async (req, res) => {
    try {
        const contact = await UserContact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatecontactenquiry = async(req,res) =>{
    try {
        const updateContact = await userContacts.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true })
        if(!updateContact)
            return res.stauts(404).json({message:"contact not found"})
        res.status(200).json({message:"contact enquiry updated successfully", data:updateContact})

    } catch (error) {
        res.status(400).json({message:"error in updatecontactenquiry"})
    }
}


exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await userContacts.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: "Contact not found" });

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    adId: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    userId: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate clientId
    },
    formSequence: { 
        type: [mongoose.Schema.Types.Mixed],
        required: true,
        default: [] 
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const FormSubmission = mongoose.model('FormSubmission', formSchema);

export default FormSubmission;
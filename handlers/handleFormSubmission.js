import FormSubmission from "../models/formSubmission.js";

export function createFormSubmission(adId, userId, data) {

    const newSubmission = new FormSubmission({
        adId: adId,
        userId: userId,
        formSequence: data
    });

    newSubmission.save()
        .then(sub => console.log("Form Submitted", sub))
        .catch(err => console.log("Error while submitting", err));
}
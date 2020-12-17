
const required = () => {
    return      {
        "type": "required",
        "params": ["This is required."]
    }
}

const max = (maxLength) => {
    return  {
        "type": "max",
        "params": [maxLength,`At most ${maxLength} characters`]
    }
}

const email = () => {
    return {
        "type": "email",
        "params": ["Please enter a valid email."]
    }
}

export const formData = [
        {
            "id":"firstName",
            "label": "First Name",
            "value": "Walter",
            "type": "text",
            "validationType": "string",
            "validations": [
                max(10),
                required()
            ]
        },
        {
            "id":"lastName",
            "label": "Last Name",
            "value": "Heisenberg",
            "type": "text",
            "validationType": "string",
            "validations": [
                max(15),
                required()
            ]
        },
        {
            "id":"email",
            "label": "Email",
            "value": "Walter.Heisenberg@protonmail.com",
            "type": "text",
            "validationType": "string",
            "validations":[
                email()
            ]
        }
    ]

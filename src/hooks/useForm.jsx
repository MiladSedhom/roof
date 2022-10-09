import { useState } from "react"

export function useForm(initalValue, getErrors) {
	const [formValues, setFormValues] = useState(initalValue)
	const [formErrors, setFormErrors] = useState({})

	const onChange = e => {
		setFormValues(formValues => {
			return { ...formValues, [e.target.name]: e.target.value }
		})
	}

	const validate = () => {
		let errors = getErrors(formValues)
		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	return [formValues, setFormValues, onChange, validate, formErrors]
}

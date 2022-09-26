import { useState } from "react"

export function useForm(initalValue, getErrors) {
	const [formValues, setFormValues] = useState(initalValue)
	const [formErrors, setFormErrors] = useState({})
	const [isValid, setIsValid] = useState(false)

	const onChange = e => {
		setFormValues(formValues => {
			return { ...formValues, [e.target.name]: e.target.value }
		})
	}

	const validate = () => {
		let errors = getErrors(formValues)
		setIsValid(Object.keys(errors).length === 0)
		setFormErrors(errors)
	}

	return [formValues, onChange, validate, formErrors, isValid]
}

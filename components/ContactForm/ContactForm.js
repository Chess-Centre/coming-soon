import React, { useState } from 'react';
import useTimeout from '@deadline/common/hooks/useTimeout';
import TextField from '../TextField/TextField';
import Button from '../Button/';
import Loader from '../Loader';
import { Form } from './ConatctForm.style';

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function ContactForm() {
  const [state, setState] = useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => console.log("Done!"))
      .catch((error) => alert(error))
  }

  return (
    <Form
      name="contact"
      method="post"
      action="/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
      </p>
        <TextField type="email" placeholder="placeholder" name="email" onChange={handleChange} />
        <Button type="submit" title="buttonText" />
    </Form>
  );
}

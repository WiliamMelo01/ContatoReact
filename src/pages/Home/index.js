import React, { useState } from 'react'
import { Input, Button, } from 'antd'
import 'antd/dist/antd.css';
import './index.css'
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { mask } from 'remask'

function Home() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)

    function verificarCampos() {

        return new Promise((resolve, reject) => {
            let regex = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
            if (nome.match(regex)) {
                regex = "^[\\w\\-]+(\\.[\\w\\-]+)*@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$";
                if (email.match(regex)) {
                    regex = "^[0-9]{2}[0-9]{5}-[0-9]{4}$"
                    if (telefone.match(regex)) {
                        if (feedback.length >= 10) {
                            const template_params = {
                                from_name: nome,
                                message: feedback,
                                from_email: email,
                                from_phone: telefone
                            }
                            emailjs.send('service_lh0l1tm', 'template_58c776q', template_params, 'kiotoUc1tkzHCIWkY')
                            setNome('')
                            setEmail('')
                            setTelefone('')
                            setFeedback('')
                            resolve('Obrigado por enviar seu feedback :)')
                        } else {
                            reject('Feedback deve ter pelo menos 10 caracteres')
                        }
                    } else {
                        reject('Telefone invalido')
                    }
                } else {
                    reject('Email invalido')
                }
            } else {
                reject('Nome invalido')
            }

        })

    }

    function handleClick() {

        setLoading(true)

        toast.promise(
            verificarCampos,
            {
                pending: {
                    render() {
                        return "I'm loading"
                    }
                },
                success: {
                    render({ data }) {
                        return ` ${data}`
                    }
                },
                error: {
                    render({ data }) {
                        return `${data}`
                    }
                }
            }
        )

        setTimeout(() => setLoading(false), 5000)

    }

    return (
        <div className="container">
            <h1>Contato</h1>
            <Input
                className='input'
                size='large'
                placeholder="Digite seu nome"
                allowClear
                onChange={(e) => setNome(e.target.value)}
                value={nome}
            />
            <div className="email-phone">
                <Input
                    className='input email'
                    size='large'
                    placeholder="Digite seu E-mail"
                    allowClear
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    className='input phone'
                    size='large'
                    placeholder="Digite seu telefone"
                    allowClear
                    onChange={(e) => {
                        setTelefone(mask(e.target.value, '9999999-9999'))
                    }}
                    value={telefone}
                />
            </div>
            <Input.TextArea
                className='input textarea'
                placeholder="Deixe seu feedback"
                rows={10}
                autoSize={false}
                onChange={(e) => setFeedback(e.target.value)}
                value={feedback}
            />

            <Button
                type="primary"
                size='large'
                onClick={() => handleClick()}
                loading={loading}
            >Enviar</Button>

        </div >
    )
}

export default Home

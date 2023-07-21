import express from 'express'
import OrgService from '../../services/org/orgService'
import HandleError from '../../interface/error/handleError'
import axios from 'axios'

import * as dotenv from 'dotenv' 

dotenv.config()

const orgController = express.Router()

const err = new HandleError()

/*[ controlador de verificação de existência e obtenção dos dados do cnpj ]
  este controlador fere o principío de reponsabilidade única(SOLID),
  pois verifica e obtém as informações, será necessário depurar e dividir 
  as responsabilidades em funções diferentes para depois serem invocadas 
  pelo controlador.
*/
orgController.route('/org/verify-cnpj').get(async (req, res)=>{

    let Org = { ...req.query }

    let url=`${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`

    await axios.get(url).then(response => {
        
       if(response.data.error){

            res.status(404).json({

                response: response.data,
                organizationExists: false
            })
       }
       
       else{

            res.status(200).json({

                headers: response.headers,
                response: response.data,
                organizationExists: true
            })
       }

    }).catch(_ => res.status(500).json({ error: 'i am sorry, there is an error with server'}))
})

orgController.route('/org/save').post(async (req, res)=>{

    const Org = { ...req.body }

    try{

        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null')

        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty')
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty')
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty')
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty')
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty')
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty')
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty')
        
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const verification = new OrgService().verifyCnpj(Org.cnpj)

    const test = await verification.then(e => e)

    /** 
     *  código aqui:
     *  
     *      verificar se organização existe,
     *      se não retorna uma resposta 404
     * 
    */

    if(test === true) return res.status(400).send('cnpj already exists')

    const response = new OrgService( 
                    Org.fantasy_name, 
                    Org.corporate_name,
                    Org.cnpj, 
                    Org.org_status, 
                    Org.cnae_main_code,
                    Org.open_date, 
                    Org.password).save()
    
    await response.then(__ => res.status(201).json({ msg: 'organization created' }))
})

orgController.route('/org/update/:id').put(async (req, res)=>{

    const Org = { ...req.body } 

    try{

        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null')
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null')

        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty')
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty')
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty')
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty')
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty')
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty')
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty')
        
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4')
    }catch(e){

        return res.status(400).json({ error: e })
    }

    const response = new OrgService(  
                    Org.fantasy_name, 
                    Org.corporate_name,
                    Org.cnpj, 
                    Org.org_status, 
                    Org.cnae_main_code,
                    Org.open_date, 
                    Org.password).update(req.params.id)

    await response.then(__ => res.status(201).json({ msg: 'organization updated' }))
})

orgController.route('/org/get-all').get(async (req, res)=>{

    const response = new OrgService().getAll()

    await response.then(data => res.status(200).json(data))
})

orgController.route('/org/get-by-id/:id').get(async (req, res)=>{

    const response = new OrgService().getById(req.params.id)  
    
    await response.then(data => res.status(200).json(data))
})

orgController.route('/org/delete-by-id/:id').delete(async (req, res)=>{

    const response = new OrgService().deleteByid(req.params.id)  
    
    await response.then(__ => res.status(204).json())
})

export { orgController }

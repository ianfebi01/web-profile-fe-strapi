'use client';;
import { FunctionComponent, useEffect, useRef } from 'react';
import Modal from './Modal'
import { generateValidationSchema } from '@/lib/generateValidationSchema'
import { IDynamicForm } from '@/types/form'
import { Form, FormikProvider, useFormik } from 'formik'
import FormikField from '../Inputs/FormikField'
import { IPayloadPagination } from '@/types/api';
import { useEdit, useGetDetail } from '@/lib/hooks/api/skill'
import { EditForm } from '@/lib/constan/form/skill'

interface Props {
  isOpen: boolean
  setIsOpen: ( value: boolean ) => void
  params: IPayloadPagination
  detailDataId: number
}
const ModalEditSkill: FunctionComponent<Props> = ( {
  isOpen,
  setIsOpen,
  detailDataId,
} ) => {

  /**
   *  Get detail
   */
  const {
    data: detail,
    isSuccess: isDetailSuccess,
    isStale: isDetailStale,
    isFetching: isDetailPending,
    refetch,
  } = useGetDetail( detailDataId, false )

  useEffect( () => {
    if ( isOpen ) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen] )

  /**
   *  Edit
   */
  const onEditSuccess = () => {
    setIsOpen( false )
  }
  const { mutate, isPending } = useEdit( { onSuccess : onEditSuccess } )

  /**
   *  Form
   */
  const schema = generateValidationSchema( EditForm )

  /**
   *  Formik
   */
  const formik = useFormik( {
    initialValues : {
      name        : '',
      description : '',
      image       : '',
    },
    validationSchema : schema,
    onSubmit         : ( value ) => {
      mutate( { ...value, id : detailDataId } )
    },
  } )

  const submitRef = useRef<HTMLButtonElement>( null )

  useEffect( () => {
    if ( isOpen ) {
      formik.setFieldValue( 'name', detail?.data?.name )
      formik.setFieldValue( 'description', detail?.data?.description )
      formik.setFieldValue( 'image', detail?.data?.image )
    }
    if ( isOpen === false )
      formik.handleReset( {
        name        : '',
        description : '',
        image       : '',
      } )
  }, [isDetailSuccess, isDetailStale] )

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onConfirm={() => submitRef.current?.click()}
      onCancel={() => setIsOpen( false )}
      title="Edit skill"
      loading={isPending}
    >
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2"
        >
          {EditForm.map( ( item: IDynamicForm ) => (
            <FormikField
              label={item.label}
              name={item.name}
              placeholder={item.placeholder}
              key={item.name}
              fieldType={item.fieldType}
              required={item.validation?.required}
              loading={isDetailPending}
            />
          ) )}
          <button ref={submitRef}
            type="submit"
            className="hidden"
          ></button>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default ModalEditSkill

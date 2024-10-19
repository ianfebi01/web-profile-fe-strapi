import { IDynamicForm } from '@/types/form'

export const EditForm: IDynamicForm[] = [
  {
    name        : 'name',
    type        : 'text',
    placeholder : 'eg. Frontend Developer',
    fieldType   : 'text',
    label       : 'Name',
    validation  : {
      charLength : {
        min : 3,
        max : 30,
      },
      required : true,
    },
  },
  {
    name        : 'description',
    type        : 'text',
    placeholder : 'eg. Create user interface based on figma',
    fieldType   : 'text',
    label       : 'Description',
    validation  : {
      charLength : {
        min : 3,
        max : 300,
      },
      required : true,
    },
  },
  {
    name        : 'image',
    type        : 'image',
    placeholder : 'Upload image',
    fieldType   : 'image',
    label       : 'Icon',
    validation  : {
      required : true,
      image    : {
        maxSize : 1000,
      },
    },
  },
]

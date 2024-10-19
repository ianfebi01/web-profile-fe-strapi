'use client'

import { Column } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  TableNode,
} from '@table-library/react-table-library/table'
import { useMemo } from 'react'
import Spinner from './Icons/Spinner'

export interface IColumn<T extends TableNode> extends Column<T> {
  size?: string | number
}
interface Props {
  columns: IColumn<any>[]
  datas: any
  loading?: boolean
}

const DataTable = ( { columns, datas = [], loading = false }: Props ) => {
  const themeStyles = useMemo( () => {
    return {
      Table : `
              border: 1px solid rgba(251, 251, 251, 0.20);
              border-radius: 0.5rem;
              --data-table-library_grid-template-columns: ${columns
    ?.map( ( item ) =>
      item?.size ? `minmax(0px, ${item.size})` : 'minmax(0px, 1fr)'
    )
    .join( ' ' )};
            `,
      HeaderRow : `
              background-color: #222222;
              color: #f1f1f1;
            `,
      HeaderCell : `
              font-weight: 400;
              font-size: 0.875rem;
              border-bottom: 1px solid rgba(251, 251, 251, 0.20);
              padding-block: 0.75rem;
            `,
      Row : `
              transition: all 0.15s ease-in-out;
              cursor: pointer;
      
              &:nth-of-type(odd) {
                background-color: #393939;
                color: #f1f1f1;
              }
      
              &:nth-of-type(even) {
                background-color: #313131;
                color: #f1f1f1;
              }
      
              &:nth-of-type(odd):hover {
                color: rgba(251, 251, 251, 0.40);
              }
      
              &:nth-of-type(even):hover {
                color: rgba(251, 251, 251, 0.40);
              }
      
              &:not(:last-of-type) > .td {
              border-bottom: 1px solid transparent;
            }
      
            `,
      Cell : `
              &:focus {
                outline: dotted;
                outline-width: 1px;
                outline-offset: -1px;
              }
      
              font-size: 0.875rem;
              padding-block: 0.75rem;
            `,
    }
  }, [columns] )
  const theme = useTheme( [getTheme(), themeStyles] )

  return (
    <div className="relative">
      {loading && <OverlayLoading />}
      <Table
        data={{ nodes : datas }}
        theme={theme}
        layout={{ custom : true, horizontalScroll : true }}
      >
        {( tableList: any ) => (
          <>
            <Header>
              <HeaderRow>
                {columns.map( ( item, i ) => (
                  <HeaderCell key={i}
                    {...item.cellProps}
                  >
                    {item.label}
                  </HeaderCell>
                ) )}
              </HeaderRow>
            </Header>

            <Body className="relative">
              {tableList?.length ? (
                tableList.map( ( item: any ) => (
                  <Row key={item.id}
                    item={item}
                  >
                    {columns.map( ( column, i ) => (
                      <Cell key={i}>{column.renderCell( item )}</Cell>
                    ) )}
                  </Row>
                ) )
              ) : (
                <tr>
                  <td colSpan={columns?.length || 0}>
                    <div className="w-full h-72">
                      <div className="absolute inset-x-0 inset-y-0 mx-auto my-auto w-fit h-fit">
                        <span>No Data</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Body>
          </>
        )}
      </Table>
    </div>
  )
}

export default DataTable

const OverlayLoading = () => (
  <>
    <div className="absolute z-10 w-full h-full top-0 left-0 inset-x-0 inset-y-0 mx-auto my-auto bg-dark-secondary opacity-60 rounded-lg" />
    <div className="absolute z-10 inset-x-0 inset-y-0 mx-auto my-auto w-fit h-fit">
      <Spinner />
    </div>
  </>
)

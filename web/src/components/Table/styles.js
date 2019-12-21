import styled from 'styled-components';

export const Container = styled.table`
    width: 100%;
    border-collapse: collapse;

    thead th {
        text-transform: uppercase;
        text-align: left;
        font-size: 16px;
        padding: 12px 0;
    }

    tbody {
        tr {
            border-bottom: 1px solid #eee;

            &:last-child {
                border-bottom: 0;
            }
        }

        td {
            padding: 12px 0;
            color: #666;
            font-size: 16px;

            &:last-child {
                text-align: right;
            }
        }
    }
`;

export const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
    let aValue, bValue;

    switch (orderBy) {
        case 'company':
            aValue = a.company.name;
            bValue = b.company.name;
            break;
        case 'address':
            aValue = `${a.address.address}, ${a.address.city}`;
            bValue = `${b.address.address}, ${b.address.city}`;
            break;
        case 'role':
            aValue = a.company.title;
            bValue = b.company.title;
            break;
        default:
            aValue = a[orderBy];
            bValue = b[orderBy];
    }

    if (bValue < aValue) {
        return -1;
    }
    if (bValue > aValue) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter(
            (user) =>
                `${user.firstName} ${user.lastName}`.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                user.company.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                `${user.address.address}, ${user.address.city}`.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    return inputData;
}
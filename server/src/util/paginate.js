module.exports = (page, pageSize = 10) => {
    const pageOffset = page ? page - 1 : 0;
    const offset = pageOffset * pageSize;
    const limit = offset + pageSize;

    return { offset, limit };
};

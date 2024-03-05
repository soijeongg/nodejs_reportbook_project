export default(req, res, next)=> {
    const error = new Error('경로를 확인해주세요')
    error.status = 404
    throw error
}
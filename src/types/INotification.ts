interface INotification {
    id: number,
    senderUserId: number,
    userReceivingRequestId: number
    status: string
}

export default INotification
import { useNotificationContext } from '../context/NotificationContext'

export default function NotificationsPage() {
  const { notifications, markAllAsRead, deleteNotification, markOneAsRead } = useNotificationContext()

  return (
    <div className="notifications-page">
      <section className="page-header simple-header">
        <div>
          <p className="eyebrow">Updates</p>
          <h1>Notifications</h1>
        </div>
        <button type="button" className="secondary-btn small" onClick={markAllAsRead}>Mark all as read</button>
      </section>

      {notifications.length ? notifications.map((notification) => (
        <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.detail}</p>
            <small>{notification.time}</small>
          </div>
          <div className="inline-actions">
            {!notification.read && <button type="button" className="secondary-btn small" onClick={() => markOneAsRead(notification.id)}>Read</button>}
            <button type="button" className="text-button" onClick={() => deleteNotification(notification.id)}>Delete</button>
          </div>
        </div>
      )) : <div className="empty-state"><h3>No notifications</h3><p>You’re all caught up.</p></div>}
    </div>
  )
}

import { Resend } from 'resend';
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import { Order } from '@/types';
import PurchaseReceiptEmail from './purchase-receipt';
import NewOrderNotificationEmail from './new-order-notification'; // 导入新订单通知模板

const resend = new Resend(process.env.RESEND_API_KEY as string);

/**
 * 【邮件类型1】发送购买收据邮件
 * 触发时机：订单支付成功后
 * 收件人：下单客户
 * 用途：确认支付成功，提供订单详情
 */
export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: order.user.email,
      subject: `Order Confirmation ${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });
    console.log(`✅ Purchase receipt email sent to ${order.user.email} for order ${order.id}`);
  } catch (error) {
    console.error(`❌ Failed to send purchase receipt email:`, error);
    throw error; // 让调用方决定是否中断流程
  }
};

/**
 * 【邮件类型2】发送新订单通知邮件
 * 触发时机：客户成功创建订单后（无论是否支付）
 * 收件人：业务员/管理员
 * 用途：及时通知业务员跟进未支付订单
 * 
 * @param order - 订单对象
 * @param recipients - 收件人数组，默认为业务员邮箱
 */
export const sendNewOrderNotification = async ({ 
  order, 
  recipients = ['sales@newsinoenergy.com', 'sales@panasonicservomotor.com'] // 默认收件人，可根据实际修改
}: { 
  order: Order; 
  recipients?: string[]; // 可选参数，可指定多个收件人
}) => {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: recipients, // 数组形式发送给多个收件人
      subject: `🆕 新订单待处理 - 订单号: ${order.id.slice(-8)}`, // 取订单号后8位，更简洁
      react: <NewOrderNotificationEmail order={order} />,
    });
    console.log(`✅ New order notification sent for order ${order.id} to ${recipients.join(', ')}`);
  } catch (error) {
    console.error(`❌ Failed to send new order notification:`, error);
    // 不抛出错误，避免中断订单创建流程
    // 邮件发送失败不应影响订单创建成功
  }
};

/**
 * 【可选】批量发送邮件
 * 如果未来需要发送营销邮件或其他批量通知
 */
// export const sendBulkEmails = async (emails: Array<{ to: string; subject: string; react: JSX.Element }>) => {
//   try {
//     const promises = emails.map(email => 
//       resend.emails.send({
//         from: `${APP_NAME} <${SENDER_EMAIL}>`,
//         ...email
//       })
//     );
//     await Promise.all(promises);
//     console.log(`✅ Bulk emails sent successfully`);
//   } catch (error) {
//     console.error(`❌ Failed to send bulk emails:`, error);
//   }
// };
import { Card, CardContent } from "@/components/ui/card";
import ContactButtons from "./contact-buttons";

interface ContactBarProps {
  productName?: string;
}

const ContactBar = ({ productName }: ContactBarProps) => {
  // 这些可以来自配置文件或环境变量
  const whatsappNumber = "8613760812861"; // 替换成你的号码
  const emailAddress = "sales@panasonicservomotor.com"; // 替换成你的邮箱

  return (
    <Card className="mt-4 bg-gradient-to-r from-green-50 to-blue-50">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-semibold text-gray-800">
                Need bulk discount or technical specs? Contact us for best price!
              </p>
              <p className="text-sm text-gray-600">
                We&apos;re here to help 24/7
              </p>
            </div>
          </div>
          
          <ContactButtons 
            whatsappNumber={whatsappNumber}
            emailAddress={emailAddress}
            productName={productName}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactBar;
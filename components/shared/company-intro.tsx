// components/shared/company-intro.tsx
import React from 'react';

const CompanyIntro = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* 公司简介 */}
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Our Company
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded in 2006, Our company is a leading independent stocking distributor of electronic components. 
              We specialize in sourcing obsolete and hard-to-find electronic components, and we help our customers 
              manage excess inventory. We have a strong commitment to quality management and are deeply invested in 
              maintaining the highest quality standards.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our company&apos;s mission is to solve supply chain disruptions and keep our customers&apos; production lines 
              running smoothly. Our team 
              helps manufacturers become more environmentally friendly by finding buyers for their surplus inventory, 
              and we are investing in processes that align with best practices for environmental, social, and corporate 
              governance.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our customer base covers a wide range of market segments, including automation, aerospace, industrial goods, 
              networking systems, and consumer goods. We have ready access to several OEMs&apos; surplus inventories around the world.
            </p>
          </div>

          {/* 快速统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-primary">2006</div>
              <div className="text-sm text-gray-500">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-sm text-gray-500">Markets Served</div>
            </div>
            <div>
               <div className="text-3xl font-bold text-primary">10K+</div>
               <div className="text-sm text-gray-500">Parts in Stock</div>
             </div>
            <div>
              <div className="text-3xl font-bold text-primary">Global</div>
              <div className="text-sm text-gray-500">OEM Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
import React, { useState } from 'react';
import { Layout, Typography, Collapse, Row, Col } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const faqData = [
  {
    question: 'What is CT image segmentation?',
    answer: 'CT image segmentation is the process of partitioning a CT scan into different regions or segments, typically to isolate areas of interest such as organs or tumors for further analysis.',
  },
  {
    question: 'How does 2D segmentation differ from 3D segmentation?',
    answer: '2D segmentation processes individual slices of a CT scan, whereas 3D segmentation considers the entire volumetric data, providing a more comprehensive analysis of the structures within the scan.',
  },
  {
    question: 'What are the benefits of using your segmentation tool?',
    answer: 'Our tool offers high accuracy, efficiency, and ease of use, allowing healthcare professionals to quickly and accurately segment CT images for better diagnosis and treatment planning.',
  },
  {
    question: 'Is the segmentation process automated?',
    answer: 'Yes, our segmentation tool uses advanced algorithms and machine learning techniques to automate the segmentation process, reducing the need for manual intervention.',
  },
  {
    question: 'How is my data protected?',
    answer: 'We prioritize data security and comply with all relevant regulations to ensure your data is protected. All data is encrypted, and access is restricted to authorized personnel only.',
  },
  {
    question: 'Can I use your tool for both 2D and 3D CT images?',
    answer: 'Absolutely. Our tool supports both 2D and 3D CT image segmentation, providing versatile solutions for various medical imaging needs.',
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No installation is required. Our tool is web-based, allowing you to access it from any device with an internet connection.',
  },
  {
    question: 'How can I get support if I encounter issues?',
    answer: 'You can contact our support team via email or phone. We also provide detailed documentation and tutorials to help you get started and troubleshoot common issues.',
  },
];

const Faq: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const onCollapseChange = (key: string | string[]) => {
    setActiveKey(Array.isArray(key) ? key : [key]);
  };

  return (
    <Layout className="min-h-screen  ">
      <Content>
        <div className="container mx-auto py-16 px-8">
          <Row justify="center" className="mb-16">
            <Col span={24}>
              <Title level={1} className="text-center font-bold text-5xl">Frequently Asked Questions</Title>
              <Paragraph className="text-center text-xl mt-4">
                Find answers to common questions about our CT image segmentation tool.
              </Paragraph>
            </Col>
          </Row>

          <Row justify="center">
            <Col span={24} md={18}>
              <Collapse
                activeKey={activeKey}
                onChange={onCollapseChange}
                expandIconPosition="right"
                
              >
                {faqData.map((faq, index) => (
                  <Panel
                    header={<span className="">{faq.question}</span>}
                    key={index.toString()}
                    className=" shadow-sm"
                  >
                    <Paragraph className=" text-lg">{faq.answer}</Paragraph>
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Faq;

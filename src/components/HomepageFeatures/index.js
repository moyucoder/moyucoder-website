import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '资产式产品化',
    Svg: require('@site/static/img/focus-on-assets.svg').default,
    description: (
      <>
        拒绝无意义的重复沟通。我们通过完美的业务梳理和设计系统构建，把业务逻辑与界面做成标准组件库，实现“一次沉淀，全员复用”，从源头消灭无效哔哔。
      </>
    ),
  },
  {
    title: '极客自动化',
    Svg: require('@site/static/img/automate-everything.svg').default,
    description: (
      <>
        狂热追求极致效率。从工程化工具链、一键发布 CI/CD 基础设施，到接口与质量保障的自动化测试左移，能让程序跑的，人绝不插手。
      </>
    ),
  },
  {
    title: '深度摸鱼学',
    Svg: require('@site/static/img/learn-think-create.svg').default,
    description: (
      <>
        摸鱼是第一生产力。我们在省下来的时间里去技术攻坚、去复盘故障、去引入新工具，或者干脆无聊发呆。在这里，不哔哔，用偷懒的智慧创造新东西。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Disclaimer() {
  return (
    <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h4 className="font-bold text-yellow-400 mb-2">Disclaimer</h4>
          <p className="text-sm text-purple-200">
            This platform is for <strong>informational and educational purposes only</strong>. 
            The Sacred27 analysis, whale activity, and trading signals are <strong>not financial advice</strong>. 
            All investment decisions should be made after consulting with a qualified financial advisor. 
            Past performance does not guarantee future results. Trading stocks involves risk of loss.
          </p>
        </div>
      </div>
    </div>
  );
}
